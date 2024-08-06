import { NextResponse } from "next/server";
import { ConnectDB } from "../lib/config/db";
import TodoModel from "../lib/models/TodoModel";

// whenever our route will be initialized, first LoadDB function will be called and we will be connected with our database.
const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export async function GET(request) {
  const incompleteOnly = request.nextUrl.searchParams.get("incompleteOnly");
  let query = {};
  if (incompleteOnly === "true") {
    query = { isCompleted: false };
  }
  const todos = await TodoModel.find(query);
  return NextResponse.json({ todos });
}

export async function POST(request) {
  const { title } = await request.json();

  await TodoModel.create({ title });

  return NextResponse.json({ msg: "Todo Created" });
}

export async function PUT(request) {
  const mongoId = await request.nextUrl.searchParams.get("mongoId");
  await TodoModel.findByIdAndUpdate(mongoId, {
    $set: {
      isCompleted: true,
    },
  });

  return NextResponse.json({ msg: "Todo Completed" });
}
