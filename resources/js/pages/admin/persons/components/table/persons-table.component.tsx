import { Table } from '@/components/ui/table';
import PersonsTableBody from './persons-table-body.component';
import PersonsTableFooter from './persons-table-footer.component';
import PersonsTableHeader from './persons-table-header.component';

export default function PersonsTable() {
    return (
        <div className="rounded-md border">
            <Table>
                <PersonsTableHeader />
                <PersonsTableBody />
                <PersonsTableFooter />
            </Table>
        </div>
    );
}
