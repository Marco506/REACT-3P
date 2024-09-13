// GET
export async function GetTareas() {
    try {
      const response = await fetch("http://localhost:3000/tareas");
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error in GET request:", error.message);
      throw error;
    }
  }