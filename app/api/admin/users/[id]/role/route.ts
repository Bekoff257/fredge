import { NextResponse } from 'next/server'; export async function PATCH(){ return NextResponse.json({deprecated:true},{status:410}); }
