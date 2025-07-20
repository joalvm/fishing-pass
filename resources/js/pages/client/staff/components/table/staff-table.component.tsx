import { Table } from '@/components/ui/table';
import StaffTableBody from './staff-table-body.component';
import StaffTableFooter from './staff-table-footer.component';
import StaffTableHeader from './staff-table-header.component';

export default function StaffTable() {
    return (
        <div className="rounded-md border">
            <Table>
                <StaffTableHeader />
                <StaffTableBody />
                <StaffTableFooter />
            </Table>
        </div>
    );
}
