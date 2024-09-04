  
  // DELETE
  export async function DeleteItem(id) {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
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
  