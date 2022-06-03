import setText, { appendText, showWaiting, hideWaiting } from "./results.mjs";

export function get() {
    axios.get('http://localhost:3000/orders/1').then(({ data }) => {
        setText(JSON.stringify(data));
    });
}

export function getCatch() {
    axios.get('http://localhost:3000/orders/12332').then((result) => {

        if (result.status === 200) {
            setText(JSON.stringify(result.data));
        }

    }).catch((error) => {
        setText(error.message);
    });
}

export function chain() {
    axios.get('http://localhost:3000/orders/1').then((result) => {

        if (result.status === 200) {
            // setText(JSON.stringify(result.data));
            return axios.get(`http://localhost:3000/addresses/${result.data.shippingAddress}`);
        }

    }).then((result) => {
        setText(JSON.stringify(result));
    });
}

export function chainCatch() {
    axios.get('http://localhost:3000/orders/1').then((result) => {
        if (result.status === 200) {
            return axios.get(`http://localhost:3000/addresses/${result.data.shippingAddress}`);
        }
    })
        .then((result) => {
            setText(JSON.stringify(result));
        })
        .catch((error) => setText(error));
}

export function final() {
    showWaiting();
    axios.get('http://localhost:3000/orders/1').then((result) => {
        if (result.status === 200) {
            return axios.get(`http://localhost:3000/addresses/${result.data.shippingAddress}`);
        }
    })
        .then((result) => {
            setText((result.data.city));
        })
        .catch((error) => setText(error))
        .finally(() => {
            setTimeout(hideWaiting, 1000);
            appendText("<br><br>Completely done");

        });
}