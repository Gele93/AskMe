import { CreateUserDto, LoginUserDto, Set, Theme, User } from "../types/types";

const api = "/api"

export const fetchCreateSetPreview = async (name: string, description: string, file: any | null, isFormated: boolean | null): Promise<Set> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('description', description);

    try {
        const response = await fetch(`${api}/set/${isFormated ? "formated" : "unformated"}/preview`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to submit form');
        }

        const result: Set = await response.json();
        console.log('Success:', result);
        return result
    } catch (error) {
        console.error('Error:', error);
        throw new Error("failed to create set preview")
    }
};

export const fetchCreateSet = async (set: Set): Promise<boolean> => {
    try {
        const response = await fetch(`${api}/set`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(set),
        });

        if (!response.ok) {
            console.error('Failed to create set');
            return false
        }
        return true

    } catch (error) {
        console.error('Error creating set:', error);
        return false
    }
}


export const fetchRegisterUser = async (user: CreateUserDto) => {
    try {
        console.log(api)
        const response = await fetch(`${api}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Failed to register user');
        }
        console.log('User registered successfully:');
    } catch (error) {
        console.error('Error registering user:', error);
    }
}

export const fetchLoginUser = async (user: LoginUserDto): Promise<User> => {
    try {
        const response = await fetch(`${api}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Failed to login user');
        }
        const result: User = await response.json();
        return result
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};

export const fetchLogoutUser = async () => {
    try {
        const response = await fetch(`${api}/user/login`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Failed to logout user');
        }
    } catch (error) {
        console.error('Error logging in user:', error);
    }
};

export const fetchGetSets = async (): Promise<Set[]> => {
    try {
        const response = await fetch(`${api}set`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch sets');
        }

        const result: Set[] = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching sets:', error);
        return [];
    }
};


export const shortenTitle = (title: string, maxLength: number) => {
    if (!title) return
    if (title.length < maxLength) {
        return title
    }

    const words = title.split(" ")
    let wordIndex = 0
    let totalChar = 0

    for (let i = 0; i < words.length; i++) {
        totalChar += words[i].length + 1
        if (totalChar > maxLength) {
            wordIndex = i - 1
            break
        }
    }

    const wordsOfShortTitle = []
    for (let i = 0; i < wordIndex; i++) {
        wordsOfShortTitle.push(words[i])
    }

    let shortenedTitle = wordsOfShortTitle.join(" ")
    shortenedTitle = shortenedTitle + "..."
    return shortenedTitle
}

export const checkAuthorization = async (): Promise<boolean> => {
    try {
        const response = await fetch(`${api}/user/authorize`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            console.error('Authorization check failed');
            return false
        }
        return true;
    } catch (error) {
        console.error('Error checking authorization:', error);
        return false;
    }
};

export const fetchDeleteSet = async (setId: number): Promise<boolean> => {
    try {
        const response = await fetch(`${api}/set/${setId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (!response.ok) {
            console.error('Failed to delete set');
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error deleting set:', error);
        return false;
    }
};

export const fetchUpdateTheme = async (theme: Theme): Promise<boolean> => {
    try {
        const response = await fetch(`${api}/theme`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(theme),
        });

        if (!response.ok) {
            console.error('Failed to update theme');
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error updating theme:', error);
        return false;
    }
};

export const fetchDeleteTheme = async (themeId: number): Promise<boolean> => {
    try {
        const response = await fetch(`${api}/theme/${themeId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (!response.ok) {
            console.error('Failed to delete theme');
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error deleting theme:', error);
        return false;
    }
};