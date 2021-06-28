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
    // All of these routes will be at the base URL:     /api/WishLists
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case WishListsController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class WishListsController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public WishListsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/WishLists
        //
        // Returns a list of all your WishLists
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WishList>>> GetWishLists()
        {
            // Uses the database context in `_context` to request all of the WishLists, sort
            // them by row id and return them as a JSON array.
            return await _context.WishLists.OrderBy(row => row.Id).Include(wishList => wishList.Legos).ToListAsync();
        }

        // GET: api/WishLists/5
        //
        // Fetches and returns a specific wishList by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<WishList>> GetWishList(int id)
        {
            // Find the wishList in the database using `FindAsync` to look it up by id
            var wishList = await _context.WishLists.Include(wishList => wishList.Legos).Where(wishList => wishList.Id == id).FirstOrDefaultAsync();

            // If we didn't find anything, we receive a `null` in return
            if (wishList == null)
            {
                // Return a `404` response to the client indicating we could not find a wishList with this id
                return NotFound();
            }

            //  Return the wishList as a JSON object.
            return wishList;
        }

        // PUT: api/WishLists/5
        //
        // Update an individual wishList with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a WishList
        // variable named wishList. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our WishList POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWishList(int id, WishList wishList)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != wishList.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in wishList to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from wishList
            _context.Entry(wishList).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!WishListExists(id))
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
            return Ok(wishList);
        }

        // POST: api/WishLists
        //
        // Creates a new wishList in the database.
        //
        // The `body` of the request is parsed and then made available to us as a WishList
        // variable named wishList. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our WishList POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<WishList>> PostWishList(WishList wishList)
        {
            // Indicate to the database context we want to add this new record
            _context.WishLists.Add(wishList);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetWishList", new { id = wishList.Id }, wishList);
        }

        // DELETE: api/WishLists/5
        //
        // Deletes an individual wishList with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWishList(int id)
        {
            // Find this wishList by looking for the specific id
            var wishList = await _context.WishLists.FindAsync(id);
            if (wishList == null)
            {
                // There wasn't a wishList with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.WishLists.Remove(wishList);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(wishList);
        }

        // Private helper method that looks up an existing wishList by the supplied id
        private bool WishListExists(int id)
        {
            return _context.WishLists.Any(wishList => wishList.Id == id);
        }
    }
}
