const url = process.env.NEXT_PUBLIC_DATABASE_URL;

export default async function addNote(payload) {
  try {
    const respond = await fetch(`${url}/note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),

    });
    const data = await respond.json();
    return data;
  } catch (error) {
    console.warn('I could not create a note', error);
  }

  return null;
}

// get all notes
export async function getNotes() {
  try {
    const respond = await fetch(`${url}/note`);
    const data = await respond.json();
    return data;
  } catch (error) {
    console.warn('I could not get notes', error);
  }

  return null;
}

// delete a note
export async function deleteNote(id) {
  try {
    const respond = await fetch(`${url}/note/${id}`, {
      method: 'DELETE',
    });
    const data = await respond;
    return data;
  } catch (error) {
    console.warn('I could not delete the note', error);
  }

  return null;
}
