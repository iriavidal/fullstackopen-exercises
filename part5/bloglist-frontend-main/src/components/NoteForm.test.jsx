import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NoteForm from "./NoteForm";
import { vi } from "vitest";

describe("<NoteForm />", () => {
  test("calls event handler with correct details when a new blog is created", async () => {
    const userSetup = userEvent.setup();
    const mockHandler = vi.fn();
    let newBlog = { title: "", author: "", url: "" };
    const setNewBlog = vi.fn((updatedBlog) => {
      newBlog = updatedBlog;
    });

    render(
      <NoteForm
        handleCreate={(e) => {
          e.preventDefault();
          mockHandler(newBlog);
        }}
        newBlog={newBlog}
        setNewBlog={setNewBlog}
      />
    );

    const titleInput = screen.getByLabelText(/title/i);
    const authorInput = screen.getByLabelText(/author/i);
    const urlInput = screen.getByLabelText(/url/i);
    const createButton = screen.getByText(/create/i);

    await userSetup.type(titleInput, "New Blog Title");
    await userSetup.type(authorInput, "John Doe");
    await userSetup.type(urlInput, "http://newblog.com");
    await userSetup.click(createButton);

    expect(mockHandler).toHaveBeenCalledTimes(1);
    expect(mockHandler).toHaveBeenCalledWith({
      title: "New Blog Title",
      author: "John Doe",
      url: "http://newblog.com",
    });
  });
});
