function DataIteration({ datas = [], children }) {
  return (
    <>
      {datas &&
        datas.map((value) => children({ datas: value }))}
    </>
  );
}

export default DataIteration;
