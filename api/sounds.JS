// export the my endpoint url by using the env
const url = process.env.NEXT_PUBLIC_DATABASE_URL;

// get all sounds promise or async function
async function getAllSounds() {
  try {
    const response = await fetch(`${url}/symbol`);
    const data = await response.json();
    return data;
  } catch {
    console.warn('this is the error', Error);
  }

  return [];
}

// create a sound
async function createSound(payload) {
  try {
    const response = await fetch(`${url}/symbol`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('I could not create the object', Error);
  }
  return {};
}
// get an individual sound

// update a individual sound
async function updateSound(payload, pk) {
  try {
    const respond = await fetch(`${url}/symbol/${pk}`, {
      method: 'PUT',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await respond.json();
    return data;
  } catch (error) {
    console.warn('I could not update the sound', Error);
  }
  return 'I could not find anything';
}

// delete a sound
async function deleteSound(pk) {
  try {
    const response = await fetch(`${url}/symbol/${pk}`, {
      method: 'DELETE',
    });
    const data = response;
    return data;
  } catch (error) {
    console.warn('I could not delete the sound', Error);
  }
  return null;
}

// add sound to my list
async function addSoundToList(payload) {
  try {
    const response = fetch(`${url}/add-symbol/add_to_list`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response;
    return data;
  } catch (error) {
    console.warn('I could not add the symbol', error);
  }
  return null;
}
export {
  getAllSounds, createSound, deleteSound, updateSound, addSoundToList,
};
