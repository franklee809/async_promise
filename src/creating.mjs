import setText, { appendText } from './results.mjs';

export function timeout() {
    const wait = new Promise((resolve) => {
        setTimeout(() => { resolve('OK'); }, 1500);
    });

    wait.then((text) => setText(text));
}

export function interval() {
    let counter = 0;
    const wait = new Promise((resolve) => {
        setInterval(() => {
            console.log('🚀 ~ file: creating.mjs ~ line 17 ~ setInterval ~ counter', counter);
            resolve(`SetInterval ${++counter}`);
        }, 1000);
    });

    wait.then((text) => setText(text))
        .finally(() => console.log('🚀 ~ file: creating.mjs ~ line 24 ~ finally ~ counter', counter));
}

export function clearIntervalChain() {
    let counter = 0; let
        interval;

    const wait = new Promise((resolve) => {
        interval = setInterval(() => {
            console.log('🚀 ~ file: creating.mjs ~ line 17 ~ setInterval ~ counter', counter);
            resolve(`SetInterval ${++counter}`);
        }, 1000);
    });

    wait.then((text) => setText(text))
        .finally(() => {
            clearInterval(interval);
            console.log('🚀 ~ file: creating.mjs ~ line 24 ~ finally ~ counter', counter);
        });
}

export function xhr() {
    const request = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/users/7');
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject('Reject failed');
        xhr.send();
    });

    request.then((result) => setText(result))
        .catch((reason) => setText(reason));
}

export function allPromises() {
    const categories = axios.get('http://localhost:3000/itemCategories');
    const statuses = axios.get('http://localhost:3000/orderStatuses');
    const userTypes = axios.get('http://localhost:3000/userTypes');
    const addressTypes = axios.get('http://localhost:3000/addressTypes');

    Promise.all([categories, statuses, userTypes, addressTypes])
        .then(([cat, stat, type, addr]) => {
            setText('');
            appendText(`${cat.data.length} categories`);
            appendText(`${stat.data.length} statuses`);
            appendText(`${type.data.length} user types`);
            appendText(`${addr.data.length} address types`);
        })
        .catch((reason) => setText(reason));
}

export function allSettled() {
    const categories = axios.get('http://localhost:3000/itemCategories');
    const statuses = axios.get('http://localhost:3000/orderStatuses');
    const userTypes = axios.get('http://localhost:3000/userTypes');
    const addressTypes = axios.get('http://localhost:3000/addressTypes');

    Promise.allSettled([categories, statuses, userTypes, addressTypes])
        .then((values) => {
            setText('');
            values.forEach((value) => {
                if (value.status === 'fulfilled') {
                    appendText(`SUCCESS -- ${value.value.data.length} categories`);
                } else {
                    appendText(`REJECTED -- ${value.reason}`);
                }
            });
        })
        .catch((reason) => setText(reason));
}

export function race() {
    const users = axios.get('http://localhost:3000/users');
    const backup = axios.get('http://localhost:3001/users');

    Promise.race([
        users, backup,
    ]).then((user) => setText(JSON.stringify(user)))
        .catch((error) => setText(error));
}
