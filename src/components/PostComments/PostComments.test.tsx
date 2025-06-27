import { fireEvent, render, screen } from '@testing-library/react';
import Post from '.';
import PostComment from '.';


jest.mock('../../models/Comment', () => {
  return jest.fn((id: number, comment: string) => ({
    id: id,
    comment: comment,
  }));
});

describe('Teste para o componente de Comentários (Post ou PostComments)', () => {

    it('Deve renderizar o componente corretamente', () => {
        render(<Post />);
        expect(screen.getByText('Comentar')).toBeInTheDocument();
        expect(screen.getByTestId('comment-textarea')).toBeInTheDocument();
    });

    it('Deve permitir a inserção de dois comentários e exibi-los', () => {
        render(<Post />);

        const textarea = screen.getByTestId('comment-textarea');
        const submitButton = screen.getByTestId('submit-comment-button');
        const commentsList = screen.getByTestId('comments-list');

        expect(screen.getByTestId('no-comments-message')).toBeInTheDocument();
        expect(commentsList).toHaveTextContent('Nenhum comentário ainda.');

        fireEvent.change(textarea, { target: { value: 'Primeiro comentário de teste!' } });
        expect(textarea).toHaveValue('Primeiro comentário de teste!');

        fireEvent.click(submitButton);

        expect(textarea).toHaveValue('');
        expect(screen.queryByTestId('no-comments-message')).not.toBeInTheDocument();
        expect(screen.getByTestId('comment-item-0')).toHaveTextContent('Primeiro comentário de teste!');
        expect(commentsList).toHaveTextContent('Primeiro comentário de teste!');

        fireEvent.change(textarea, { target: { value: 'Este é o segundo comentário!' } });
        expect(textarea).toHaveValue('Este é o segundo comentário!');

        fireEvent.click(submitButton);

        expect(textarea).toHaveValue('');
        expect(screen.getByTestId('comment-item-0')).toHaveTextContent('Primeiro comentário de teste!');
        expect(screen.getByTestId('comment-item-1')).toHaveTextContent('Este é o segundo comentário!');
        expect(commentsList).toHaveTextContent('Primeiro comentário de teste!');
        expect(commentsList).toHaveTextContent('Este é o segundo comentário!');

        expect(screen.queryByTestId('comment-item-2')).not.toBeInTheDocument();
    });

    it('Não deve adicionar um comentário se o campo estiver vazio ou com apenas espaços', () => {
        render(<Post />);

        const textarea = screen.getByTestId('comment-textarea');
        const submitButton = screen.getByTestId('submit-comment-button');
        const commentsList = screen.getByTestId('comments-list');

        expect(screen.getByTestId('no-comments-message')).toBeInTheDocument();

        fireEvent.change(textarea, { target: { value: '' } });
        fireEvent.click(submitButton);
        expect(screen.getByTestId('no-comments-message')).toBeInTheDocument();
        expect(textarea).toHaveValue('');

        fireEvent.change(textarea, { target: { value: '   ' } });
        fireEvent.click(submitButton);
        expect(screen.getByTestId('no-comments-message')).toBeInTheDocument();
        expect(textarea).toHaveValue('   ');
    });
});