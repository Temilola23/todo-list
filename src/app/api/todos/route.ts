```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const todos = await prisma.todo.findMany();
    return NextResponse.json({ todos }, { status: 200 });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { task, completed } = await request.json();

    if (!task) {
      return NextResponse.json({ error: "Task is required" }, { status: 400 });
    }

    const newTodo = await prisma.todo.create({
      data: {
        task,
        completed: completed || false,
      },
    });

    return NextResponse.json({ todo: newTodo }, { status: 201 });
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: "Todo deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
    try {
      const { id, task, completed } = await request.json();
  
      if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
      }
  
      const updatedTodo = await prisma.todo.update({
        where: {
          id: id,
        },
        data: {
          task: task,
          completed: completed,
        },
      });
  
      return NextResponse.json({ todo: updatedTodo }, { status: 200 });
    } catch (error) {
      console.error("Error updating todo:", error);
      return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
    }
  }
```