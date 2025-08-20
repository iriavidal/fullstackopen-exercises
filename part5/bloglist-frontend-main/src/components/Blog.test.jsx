/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  const blog = {
    title: "Testing React components",
    author: "Jane Doe",
    url: "http://example.com",
    likes: 10,
    user: { username: "jane", name: "Jane Doe" },
  };

  const user = { username: "jane" };

  test("renders title and author, but not url or likes by default", () => {
    render(<Blog blog={blog} user={user} />);

    const summary = screen.getByText("Testing React components Jane Doe");
    expect(summary).toBeDefined();

    const url = screen.queryByText("http://example.com");
    const likes = screen.queryByText("likes 10");

    expect(url).toBeNull();
    expect(likes).toBeNull();
  });

  test("renders url and likes when view button is clicked", async () => {
    render(<Blog blog={blog} user={user} />);

    const testUser = userEvent.setup();
    const button = screen.getByText("view");
    await testUser.click(button);

    expect(screen.getByText("http://example.com")).toBeDefined();
    expect(screen.getByText("likes 10")).toBeDefined();
  });

  test("calls event handler twice if like button is clicked twice", async () => {
    const mockHandler = vi.fn();
    render(<Blog blog={blog} handleLike={mockHandler} user={blog.user} />);
    const userSetup = userEvent.setup();

    const viewButton = screen.getByText("view");
    await userSetup.click(viewButton);

    const likeButton = screen.getByText("like");
    await userSetup.click(likeButton);
    await userSetup.click(likeButton);

    expect(mockHandler).toHaveBeenCalledTimes(2);
  });
});
