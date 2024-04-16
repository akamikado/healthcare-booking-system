import connect from "@/lib/db";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, name, age,gender, mobileNo, birthDate } = await req.json();
  try {
    const [result, fields] = connect.execute(
      'UPDATE patients SET name = ?, age = ?, gender = ?, phone_no = ?, dob= ? WHERE email = ?', [name, age, gender, mobileNo, birthDate, email]
    );
    if (result.affectedRows == 0) {
      return NextResponse.json({
        status: 500,
        body: JSON.stringify({ err: true, msg: "Error updating profile" }),
      });
    } else {
      return NextResponse.json({
        status: 200,
        body: JSON.stringify({ err: false, msg: "Profile updated" }),
      });
    }
  } catch (e) {
    console.log(e)
    return NextResponse.json({
      status: 500,
      body: JSON.stringify({ err: true, msg: "Error updating profile" }),
    })
  }

}

export async function GET(req: NextRequest) {
  const {email} = req.nextUrl.searchParams.get('email');

  try {
    const [result, fields] = connect.execute('SELECT * FROM patients WHERE email = ?', [email]);
    if (result.length == 0) {
      return NextResponse.json({
        status: 500,
        body: JSON.stringify({ err: true, msg: "Error fetching profile" }),
      });
    } else {
      return NextResponse.json({
        status: 200,
        body: JSON.stringify({ err: false, data: result[0] }),
      });
    }
  } catch (e) {
    console.log(e)
    return NextResponse.json({
      status: 500,
      body: JSON.stringify({ err: true, msg: "Error fetching profile" }),
    })
  }
}
