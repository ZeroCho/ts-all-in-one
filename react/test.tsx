import {useState, useCallback, useRef, useEffect, FormEvent, ChangeEvent} from 'react';

const WordRelay = () => {
  const [word, setWord] = useState('제로초');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputEl = useRef<HTMLInputElement>(null);
  // const inputEl = useRef(null);

  useEffect(() => {
    console.log('useEffect');
    // return () => {
    //   return 'no';
    // }
  }, []);
  // 의도적인 deps 미사용을 의미
  // const memo = useMemo(() => 'value', undefined);

  // const onSubmitForm = useCallback((e) => {
  const onSubmitForm = useCallback((e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    const input = inputEl.current;
    if (word[word.length - 1] === value[0]) {
      setResult('딩동댕');
      setWord(value);
      setValue('');
      if (input) {
        input.focus();
      }
    } else {
      setResult('땡');
      setValue('');
      if (input) {
        input.focus();
      }
    }
  }, [word, value]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }, []);

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputEl}
          value={value}
          onChange={onChange}
        />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};


export default WordRelay;