import { CreateUserDto, LoginUserDto, Set, User } from "../types/types";

export const handleSetSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('name', "name");
    formData.append('description', "description");

    try {
        const response = await fetch('/api/set/unformated', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to submit form');
        }

        const result = await response.json();
        console.log('Success:', result);
    } catch (error) {
        console.error('Error:', error);
    }
};

export const fetchRegisterUser = async (user: CreateUserDto) => {
    try {
        const response = await fetch('/api/user/register', {
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
        const response = await fetch('/api/user/login', {
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
        const response = await fetch('/api/user/login', {
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
        const response = await fetch('/api/set', {
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
        const response = await fetch('/api/user/authorize', {
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