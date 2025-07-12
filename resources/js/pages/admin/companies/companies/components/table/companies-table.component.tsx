import { Table } from '@/components/ui/table';
import CompaniesTableBody from './companies-table-body.component';
import CompaniesTableFooter from './companies-table-footer.component';
import CompaniesTableHeader from './companies-table-header.component';

export default function CompaniesTable() {
    return (
        <div className="rounded-md border">
            <Table>
                <CompaniesTableHeader />
                <CompaniesTableBody />
                <CompaniesTableFooter />
            </Table>
        </div>
    );
}
