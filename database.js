const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./maBaseDeDonnees.sqlite', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connecté à la base de données SQLite.');
    db.run(`CREATE TABLE IF NOT EXISTS personnes (
      id      INTEGER PRIMARY KEY AUTOINCREMENT,
      nom     TEXT NOT NULL,
      adresse TEXT
    )`, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        const personnes = [
          { nom: 'Bob',     adresse: '12 rue de Paris' },
          { nom: 'Alice',   adresse: '34 avenue de Lyon' },
          { nom: 'Charlie', adresse: '56 boulevard de Tunis' }
        ];
        personnes.forEach((p) => {
          db.run(`INSERT INTO personnes (nom, adresse) VALUES (?, ?)`, [p.nom, p.adresse]);
        });
      }
    });
  }
});

module.exports = db;