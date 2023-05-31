const SelectGender = ({ value, setValue }) => {
  return (
    <div className="flex justify-between gap-1 items-center w-[270px] h-[40px]">
      <label htmlFor="fontSizeSelect">Gender</label>
      <select
        id="fontSizeSelect"
        value={value}
        className="rounded-sm outline-none"
        onChange={(e) => setValue(e.target.value)}
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>
  );
};
export default SelectGender;
