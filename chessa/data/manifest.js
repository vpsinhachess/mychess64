/* Knowledge files that are loaded when the page starts.
   Format: [file path, array name]  or  [file path, array name, true]  (true = kid-friendly file).
   You can add more files here. A listed file that is missing is skipped with a console warning. */
window.KB_MANIFEST=[
 ["data/my-knowledge-1.js","myKnowledge1"],
 ["data/my-knowledge-2.js","myKnowledge2",true]
];
