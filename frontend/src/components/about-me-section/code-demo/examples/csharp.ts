export const csharpExample = {
    language: "C#", file: "Checkout.cs", command: "dotnet run",
    code: `// Save an order and update inventory together.
// Roll back both changes if checkout fails.

using Microsoft.EntityFrameworkCore;

// Inside checkout: db is the context, order is the new order.
await using var transaction =
    await db.Database.BeginTransactionAsync();

try
{
    db.Orders.Add(order);
    await db.SaveChangesAsync();

    await db.Inventory
        .Where(item => item.Id == order.ItemId)
        .ExecuteUpdateAsync(update => update
            .SetProperty(item => item.Quantity,
                         item => item.Quantity - 1));

    await transaction.CommitAsync();
    Console.WriteLine("Order saved. Inventory updated.");
}
catch
{
    await transaction.RollbackAsync();
    Console.WriteLine("Checkout failed. Changes rolled back.");
    throw;
}`,
    output: "Order saved. Inventory updated.",
  };
