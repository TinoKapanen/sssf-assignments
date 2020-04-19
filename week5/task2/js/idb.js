// indexedDB stuff
let indexedDB;
if(self.indexedDB) {
    indexedDB = self.indexedDB;
} else {
    indexedDB = window.indexedDB;
}

const request = indexedDB.open('greetings', 1);
let db;

request.onupgradeneeded = (event) => {
    console.log('onupgradeneeded');
    const db = request.result;
    const outB = db.createObjectStore('outbox', {autoIncrement: true});
    const inB = db.createObjectStore('inbox', {autoIncrement: true});
};

request.onerror = (event) => {
    console.log('opening error');
};

request.onsuccess = (event) => {
    console.log('opening succes');
    db = request.result;
    db.onerror = (event) => {
        console.error('Database error: ', event.target.errorCode);
    };
};

const saveData = (name, data) => {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(name, 'readwrite');
        const store = tx.objectStore(name);
        store.put(data);     
        tx.oncomplete = () => {
            console.log('put ready');
            resolve(true);
        };
        tx.onerror = () => {
            console.log('put error');
            reject('put error');
        };
    });
};

const loadData = (name) => {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(name, 'readwrite');
        const store = tx.objectStore(name);
        const query = store.getAll(); 
        tx.oncomplete = () => {
            console.log('query ready', query.result);
            resolve(query.result);
        };
        tx.onerror = () => {
            console.log('query error');
            reject('querry error');
        };
    });  
};

const clearData = (name) => {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(name, 'readwrite');
        const store = tx.objectStore(name);
        store.clear();
        tx.oncomplete = () => {
            console.log('clear ready');
            resolve(true);
        };
        tx.onerror = () => {
            console.log('clear error');
            reject('clear error');
        };
    });
};


