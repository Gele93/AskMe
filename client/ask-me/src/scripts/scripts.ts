import { CreateUserDto, LoginUserDto, NewPwRoute, Set, Theme, UpdatePwRequest, User } from "../types/types";

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
        console.error('failed to create set preview:', error);
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


export const fetchRegisterUser = async (user: CreateUserDto): Promise<boolean> => {
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
            console.error('Failed to register user');
            return false
        }
        return true
    } catch (error) {
        console.error('Error registering user:', error);
        return false
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
        const response = await fetch(`${api}/user/logout`, {
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
    if (title.length < maxLength) return title

    const words = title.trim().split(" ")
    let wordIndex = 0
    let totalChar = 0

    for (let i = 0; i < words.length; i++) {
        wordIndex = i + 1
        totalChar += words[i].length + 1
        if (totalChar > maxLength) {
            wordIndex--
            break
        }
    }

    if (wordIndex === -1) return "..."

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


export const fetchForgotPasswordEmail = async (email: string): Promise<boolean> => {
    try {
        const response = await fetch(`${api}/user/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "email": email }),
        });

        if (!response.ok) {
            console.error('Failed to send forgot password email');
            return false
        }
        console.log('Forgot password email sent successfully');
        return true;
    } catch (error) {
        console.error('Error sending forgot password email:', error);
        return false;
    }
}

export const fetchUpdatePassword = async (updatePwReq: UpdatePwRequest): Promise<boolean> => {
    try {
        const response = await fetch(`${api}/user/update-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatePwReq),
        });

        if (!response.ok) {
            console.error('Failed to update password');
            return false
        }
        console.log('Password updated successfully');
        return true;
    } catch (error) {
        console.error('Error updating password:', error);
        return false;
    }
}

export const FetchValidateNewpwRoute = async (route: NewPwRoute): Promise<boolean> => {
    try {
        const response = await fetch(`${api}/user/validate-newpw-route`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(route),
        });

        if (!response.ok) {
            console.error('Failed to validate new password route');
            return false;
        }
        console.log('New password route validated successfully');
        return true;
    } catch (error) {
        console.error('Error validating new password route:', error);
        return false;
    }
}