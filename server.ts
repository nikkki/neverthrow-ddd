import { booksController } from './modules/book/composition-root';

/**
 * Normal payload { name: 'Moby-Dick', authors: ['Herman Melville'] }
 * With Invalid Title { name: '', authors: ['Herman Melville'] }
 * With Invalid AuthorS { name: 'Moby-Dick', authors: [] }
 * With Invalid One Author { name: 'Moby-Dick', authors: [''] }
 * 
 **/
booksController.createBook({ name: 'Moby-Dick', authors: [''] })
    .then(console.log)
    .catch(console.error);
