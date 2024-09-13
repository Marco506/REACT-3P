// PUT
export async function PutTareas(id, data) {
  try {
    const response = await fetch(`http://localhost:3000/tareas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error in PUT request:", error.message);
    throw error;
  }
}
