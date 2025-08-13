// app/query/route.ts
import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
  return sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;
}

export async function GET() {
  try {
    const data = await listInvoices();
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'DB query failed' }, { status: 500 });
  }
}
