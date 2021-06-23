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
    // All of these routes will be at the base URL:     /api/Legos
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case LegosController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class LegosController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public LegosController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Legos
        //
        // Returns a list of all your Legos
        //
        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<Lego>>> GetLegos()
        // {

        //     // Uses the database context in `_context` to request all of the Legos, sort
        //     // them by row id and return them as a JSON array.
        //     return await _context.Legos.OrderBy(row => row.Id).ToListAsync();
        // }

        // GET: api/Legos/5
        //
        // Fetches and returns a specific lego by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<Lego>> GetLego(int id)
        {
            // Find the lego in the database using `FindAsync` to look it up by id
            var lego = await _context.Legos.FindAsync(id);

            // If we didn't find anything, we receive a `null` in return
            if (lego == null)
            {
                // Return a `404` response to the client indicating we could not find a lego with this id
                return NotFound();
            }

            //  Return the lego as a JSON object.
            return lego;
        }

        // PUT: api/Legos/5
        //
        // Update an individual lego with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a Lego
        // variable named lego. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Lego POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLego(int id, Lego lego)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != lego.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in lego to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from lego
            _context.Entry(lego).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!LegoExists(id))
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
            return Ok(lego);
        }

        // POST: api/Legos
        //
        // Creates a new lego in the database.
        //
        // The `body` of the request is parsed and then made available to us as a Lego
        // variable named lego. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Lego POCO class. This represents the
        // new values for the record.
        //
        // [HttpPost]
        [HttpPost]
        public async Task<ActionResult<Lego>> PostLego(Lego lego)
        {
            // Indicate to the database context we want to add this new record
            _context.Legos.Add(lego);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetLego", new { id = lego.Id }, lego);
        }

        // DELETE: api/Legos/5
        //
        // Deletes an individual lego with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLego(int id)
        {
            // Find this lego by looking for the specific id
            var lego = await _context.Legos.FindAsync(id);
            if (lego == null)
            {
                // There wasn't a lego with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.Legos.Remove(lego);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(lego);
        }

        // Private helper method that looks up an existing lego by the supplied id
        private bool LegoExists(int id)
        {
            return _context.Legos.Any(lego => lego.Id == id);
        }
    }
}
