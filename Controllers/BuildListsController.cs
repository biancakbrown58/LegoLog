using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LegoLog.Models;

namespace LegoLog.Controllers
{
    // All of these routes will be at the base URL:     /api/BuildLists
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case BuildListsController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class BuildListsController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public BuildListsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/BuildLists
        //
        // Returns a list of all your BuildLists
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BuildList>>> GetBuildLists()
        {
            // return await _context.BuildLists.OrderBy(row => row.Id).ToListAsync();
            return await _context.BuildLists.OrderBy(row => row.Id).Include(buildList => buildList.Legos).ToListAsync();
        }

        // GET: api/BuildLists/5
        //
        // Fetches and returns a specific buildList by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<BuildList>> GetBuildList(int id)
        {
            // Find the buildList in the database using `FindAsync` to look it up by id
            // var buildList = await _context.BuildLists.FindAsync(id);
            var buildList = await _context.BuildLists.Include(buildList => buildList.Legos).Where(buildList => buildList.Id == id).FirstOrDefaultAsync();

            // If we didn't find anything, we receive a `null` in return
            if (buildList == null)
            {
                // Return a `404` response to the client indicating we could not find a buildList with this id
                return NotFound();
            }

            //  Return the buildList as a JSON object.
            return buildList;
        }

        // PUT: api/BuildLists/5
        //
        // Update an individual buildList with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a BuildList
        // variable named buildList. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our BuildList POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBuildList(int id, BuildList buildList)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != buildList.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in buildList to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from buildList
            _context.Entry(buildList).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!BuildListExists(id))
                {
                    // If the record we tried to update was already deleted by someone else,
                    // return a `404` not found
                    return NotFound();
                }
                else
                {
                    // Otherwise throw the error back, which will cause the request to fail
                    // and generate an error to the client.
                    throw;
                }
            }

            // Return a copy of the updated data
            return Ok(buildList);
        }

        // POST: api/BuildLists
        //
        // Creates a new buildList in the database.
        //
        // The `body` of the request is parsed and then made available to us as a BuildList
        // variable named buildList. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our BuildList POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<BuildList>> PostBuildList(BuildList buildList)
        {
            // Indicate to the database context we want to add this new record
            _context.BuildLists.Add(buildList);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetBuildList", new { id = buildList.Id }, buildList);
        }

        // DELETE: api/BuildLists/5
        //
        // Deletes an individual buildList with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBuildList(int id)
        {
            // Find this buildList by looking for the specific id
            var buildList = await _context.BuildLists.FindAsync(id);
            if (buildList == null)
            {
                // There wasn't a buildList with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.BuildLists.Remove(buildList);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(buildList);
        }

        // Private helper method that looks up an existing buildList by the supplied id
        private bool BuildListExists(int id)
        {
            return _context.BuildLists.Any(buildList => buildList.Id == id);
        }
    }
}
