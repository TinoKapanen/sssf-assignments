window.indexedDB = window.indexedDB || window.mozIndexedDB || 
window.webkitIndexedDB || window.msIndexedDB;

let request = window.indexedDB.open("QuizQuestDatabase", 1),
    db,
    tx,
    store,
    index;

request.onupgradeneeded = function(e) {
    let db = request.result,
        store = db.createObjectStore("QuestionsStore", {
            keyPath: "qID"});
        index = store.createIndex("questinText", "questionText", {unique: false});
};
        

request.onerror = function(e) {
    console.log("There was an error: " + e.target.errorCode);
};

request.onsuccess = function(e) {
    db = request.result;
    tx = db.transaction("QuestionsStore", "readwrite");
    store = tx.objectStore("QuestionStore");
    index = store.index("questionText");

    db.onerror = function(e) {
        console.log("ERROR" + e.target.errorCode);
    }

    let q1 = store.get(1);
    let qs = index.get("The grass is green.");

    q1.onsuccess = function() {
        console.log(q1.result);
        console.log(q1.result.questionText);
    };

    qs.onsuccess = function() {
        console.log(qs.result.questionText);
    }

    tx.oncomplete = function() {
        db.close();
    };
}