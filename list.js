const crypto = require('crypto');

function merkleTree(data) {
  let hashes = data.map(d => crypto.createHash('sha256').update(d).digest('hex'));

  while (hashes.length > 1) {
    const newHashes = [];
    for (let i = 0; i < hashes.length; i += 2) {
      const hash1 = hashes[i];
      const hash2 = hashes[i + 1] || '';
      const newHash = crypto.createHash('sha256').update(hash1 + hash2).digest('hex');
      newHashes.push(newHash);
    }
    hashes = newHashes;
  }

  return hashes[0];
}

function searchMerkleTree(data, target) {
  const hash = crypto.createHash('sha256').update(target).digest('hex');
  let hashes = data.map(d => crypto.createHash('sha256').update(d).digest('hex'));
  let sibling;

  for (let i = 0; i < hashes.length; i++) {
    if (hashes[i] === hash) {
      sibling = hashes[i - 1] || hashes[i + 1];
      break;
    }
  }

  const newHash = crypto.createHash('sha256').update(sibling + hash).digest('hex');

  while (hashes.length > 1) {
    const newHashes = [];
    for (let i = 0; i < hashes.length; i += 2) {
      const hash1 = hashes[i];
      const hash2 = hashes[i + 1] || '';
      const newHash = crypto.createHash('sha256').update(hash1 + hash2).digest('hex');
      newHashes.push(newHash);
    }
    hashes = newHashes;
  }

  return hashes[0];
}
