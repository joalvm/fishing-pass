import { Table } from '@/components/ui/table';
import TableHeader from './request-table-header.component';
import TableBody from './request-table-body.component';
import TableFooter from './request-table-footer.component';

export default function RequestsTable() {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader />
                <TableBody />
                <TableFooter />
            </Table>
        </div>
    );
}
