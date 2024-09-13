  // DELETE
  export async function DeleteProductos(id) {
    try {
      const response = await fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log(`Task ${id} deleted`);
        return true;
      } else {
        console.error("Error deleting task:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }