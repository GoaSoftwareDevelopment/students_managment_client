import StudentForm from "../components/StudentForm";
import Table from "../components/StudentTable";
import InfoProvider, { useInfo } from "../context/InfoContext";

const Panel = () => {
    return (
        <InfoProvider>
            <Table/>
            <StudentForm />
        </InfoProvider>
    )
}

export default Panel;