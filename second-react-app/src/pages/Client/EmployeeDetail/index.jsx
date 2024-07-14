import { useParams } from "react-router-dom";

const EmployeeDetail = () => {
  const { id } = useParams();
  return <div>EmployeeDetail {id}</div>;
};

export default EmployeeDetail;
