import axios from "axios";

export const save = (props) => {
  const baseUrl = `http://localhost:3333/${props.path}/`;
  const printer = props.obj;
  const method = printer.id ? "put" : "post";
  const url = printer.id ? `${baseUrl}/${printer.id}` : baseUrl;

  axios[method](url, printer).then((res) => {
    return (res.data);
  });
};
