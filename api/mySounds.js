const url = process.env.NEXT_PUBLIC_DATABASE_URL;

async function getAllMySounds(userId) {
  try {
    const response = await fetch(`${url}/learn-item-symbol?user_id=${userId}`);
    const data = await response.json();
    return data;
  } catch(error) {
    console.warn('I could not get all my sounds', error);
  }

  return [];
}
// delete the a sound for my list
async function deleteMySound(pk) {
  try {
    const response = await fetch(`${url}/learn-item-symbol/${pk}`, {
      method: 'DELETE',
      headers: {
        'content-Type': 'application-Json',
      },

    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('this is the error', error);
  }
  return 'completed';
}

async function addVideo(payload, pk) {
  try {
    const respond = await fetch(`${url}/learning-symbol/${pk}`, {
      method: 'PUT',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await respond.json();
    return data;
  } catch (error) {
    console.warn('I could not add the video', Error);
  }
  return 'I could not find anything';
}
export { getAllMySounds, deleteMySound, addVideo };
