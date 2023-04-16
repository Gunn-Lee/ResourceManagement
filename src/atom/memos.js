import { atom } from 'recoil';

const memos = atom({
  key: 'memos',
  default: [],
});

export default memos;
