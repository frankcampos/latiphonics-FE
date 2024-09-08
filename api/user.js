const url = process.env.NEXT_PUBLIC_DATABASE_URL;

export default async function updateUser(payload) {
  try {
    const respond = await fetch(`${url}/update_user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/Json',
      },
      body: JSON.stringify(payload),

    });

    const data = await respond.json();
    return data;
  } catch (error) {
    console.warn('I could not update the user', error);
    throw error;
  }
}
