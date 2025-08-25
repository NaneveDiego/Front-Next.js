import { redirect } from 'next/navigation'

type ActionState = {
    message: string;
    success: boolean;
  }
  
  // Essa é a função de ação que será executada no submit
  export async function update(
    prevState: ActionState,
    formData: FormData
  ): Promise<ActionState> {
    try {
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/edit/${formData.get('id')}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${formData.get('token')}`,
        },
        body: JSON.stringify({
          title: formData.get('title'),
          content: formData.get('content'),
        })
      })
  
      if (!res.ok) throw new Error('Erro ao atualizar post')
  
      return { message: 'Post atualizado com sucesso!', success: true }
    } catch (err) {
      return { message: 'Falha ao atualizar post', success: false }
    } finally {
      redirect('/')
    }
  }