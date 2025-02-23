const BASE_URL = 'https://notes-api.dicoding.dev/v1';

// Token Management
function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(accessToken) {
  localStorage.setItem('accessToken', accessToken);
}

// Fetch with token utility
async function fetchWithToken(url, options = {}) {
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${getAccessToken()}`,
  };
  return fetch(url, { ...options, headers });
}

// Auth Functions
async function login({ email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      alert(responseJson.message);
      return { error: true, data: null };
    }
    return { error: false, data: responseJson.data };
  } catch (error) {
    console.error('Login error:', error);
    return { error: true, data: null };
  }
}

async function register({ name, email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      alert(responseJson.message);
      return { error: true };
    }
    return { error: false };
  } catch (error) {
    console.error('Registration error:', error);
    return { error: true };
  }
}

async function getUserLogged() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users/me`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
    return { error: false, data: responseJson.data };
  } catch (error) {
    console.error('Fetch user error:', error);
    return { error: true, data: null };
  }
}


async function addNote({ title, body }) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body }),
    });
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
    return { error: false, data: responseJson.data };
  } catch (error) {
    console.error('Add note error:', error);
    return { error: true, data: null };
  }
}

async function getActiveNotes() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/notes`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
    return { error: false, data: responseJson.data };
  } catch (error) {
    console.error('Fetch active notes error:', error);
    return { error: true, data: null };
  }
}

async function getArchivedNotes() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/notes/archived`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
    return { error: false, data: responseJson.data };
  } catch (error) {
    console.error('Fetch archived notes error:', error);
    return { error: true, data: null };
  }
}

async function getNote(id) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
    return { error: false, data: responseJson.data };
  } catch (error) {
    console.error('Fetch note error:', error);
    return { error: true, data: null };
  }
}

async function archiveNote(id) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
      method: 'POST',
    });
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
    return { error: false, data: responseJson.data };
  } catch (error) {
    console.error('Archive note error:', error);
    return { error: true, data: null };
  }
}

async function unarchiveNote(id) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, {
      method: 'POST',
    });
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
    return { error: false, data: responseJson.data };
  } catch (error) {
    console.error('Unarchive note error:', error);
    return { error: true, data: null };
  }
}

async function deleteNote(id) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    });
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
    return { error: false, data: responseJson.data };
  } catch (error) {
    console.error('Delete note error:', error);
    return { error: true, data: null };
  }
}

export {
  getAccessToken,
  putAccessToken,
  login,
  register,
  getUserLogged,
  addNote,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
};