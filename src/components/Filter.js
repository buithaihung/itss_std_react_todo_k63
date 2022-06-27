/* 
  【Filterコンポーネント】
　・該当するTodoをステータス毎にで分けてリスト表示する
　・タブで表示する
　・サポートするステータスは「すべて」「未完了」「完了済み」
*/
function Filter( {value, onChange} ) {
  const handleClick = (key, e) => {
    e.preventDefault();
    onChange(key);
  };

  return (
    <div className="panel-tabs">
      <a
        href="/#"
        onClick={handleClick.bind(null, 'ALL')}
        className={value === 'ALL' ?  'is-active' : ''}
      >全て</a>
      <a
        href="/#"
        onClick={handleClick.bind(null, 'TODO')}
        className={value === 'TODO' ?  'is-active' : ''}
      >未完了</a>
      <a
        href="/#"
        onClick={handleClick.bind(null, 'DONE')}
        className={value === 'DONE' ?  'is-active' : ''}
      >完了済み</a>
    </div>
  );
}

export default Filter