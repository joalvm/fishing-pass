import AppLayout from '@/layouts/app/app.layout';
import Content from '@/layouts/app/components/content.component';

export default function AccessRequestPage() {
    return (
        <AppLayout title="Solicitar acceso">
            <Content size="xxl">
                <h1>Solicitar acceso</h1>
                <p>Por favor, complete el siguiente formulario para solicitar acceso.</p>
            </Content>
        </AppLayout>
    );
}
