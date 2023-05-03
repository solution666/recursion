const fs = require('fs');

function findLanguageByName(name, node, path = []) {
  // перевіряємо частину назви мови
  if (node.name.toLowerCase().includes(name.toLowerCase())) {
    return [...path, node.name];
  }

  // рекурсивно викликаємо для кожної дочірньої мови
  for (const child of node.children) {
    const result = findLanguageByName(name, child, [...path, node.name]);
    if (result) {
      return result;
    }
  }

  return null;
}

// зчитуємо дерево мов з файлу
const tree = JSON.parse(fs.readFileSync('language-tree.json'));

// приклад використання функції
const name = 'Ukrainian';
const path = findLanguageByName(name, tree);
if (path) {
  console.log(`Мову "${name}" знайдено: ${path.join(' > ')}`);
} else {
  console.log(`Мову "${name}" не знайдено`);
}
