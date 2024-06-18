const EP_REQUEST_INPUT_DATA = [
  { name: "title", type: "text", label: "Название" },
  { name: "status", type: "text", label: "Статус" },
  { name: "cypher", type: "text", label: "Шифр" },
  {
    name: "accreditationTime",
    type: "date",
    label: "Дата следующей аккредитации",
  },
];

const EP_REQUEST_SELECT_DATA = [
  { name: "level", label: "Уровень обучения", isNeedRequest: false },
  { name: "standard", label: "Стандарт обучения", isNeedRequest: false },
  {
    name: "institute",
    label: "Институт",
    query: "Institutes",
    isNeedRequest: true,
  },
  {
    name: "head",
    label: "Ответственное лицо",
    query: "Heads",
    isNeedRequest: true,
  },
];

const STANDARDS = [
  { name: "СУОС", uuid: 0 },
  { name: "ФГОС ВО", uuid: 1 },
  { name: "СУТ", uuid: 2 },
  { name: "ФГОС ВПО", uuid: 3 },
  { name: "ФГОС 3++", uuid: 4 },
];

const LEVELS = [
  { name: "Бакалавр", uuid: 0 },
  { name: "Прикладной бакалавриат", uuid: 1 },
  { name: "Специалист", uuid: 2 },
  { name: "Магистр", uuid: 3 },
  { name: "Аспирант", uuid: 4 },
];

const MODULE_REQUEST_DATA = [
  { name: "title", type: "text", label: "Название" },
  { name: "type", type: "text", label: "Тип модуля" },
];

const EMPTY_MODULE = {
  title: "",
  type: "",
};

const STATUS = "Действующая до завершения срока освоения";

const EMPTY_PROGRAM = {
  title: "",
  status: STATUS,
  cypher: "",
  level: "",
  standard: "",
  institute: "",
  head: "",
  accreditationTime: "",
};

const check = (module) => {
  const emptyList = [];
  Object.values(module).forEach((o) => {
    if (o === "") emptyList.push(o);
  });
  return emptyList;
};

export {
  EP_REQUEST_SELECT_DATA,
  EP_REQUEST_INPUT_DATA,
  MODULE_REQUEST_DATA,
  STANDARDS,
  LEVELS,
  EMPTY_MODULE,
  EMPTY_PROGRAM,
  STATUS,
  check,
};
