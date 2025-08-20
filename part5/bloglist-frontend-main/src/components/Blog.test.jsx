/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders title and author, but not url or likes by default", () => {
  const blog = {
    title: "Testing React components",
    author: "Jane Doe",
    url: "http://example.com",
    likes: 10,
    user: { username: "jane", name: "Jane Doe" },
  };

  const user = { username: "jane" };

  render(<Blog blog={blog} user={user} />);

  const summary = screen.getByText("Testing React components Jane Doe");
  expect(summary).toBeDefined();

  const url = screen.queryByText("http://example.com");
  const likes = screen.queryByText("likes 10");

  expect(url).toBeNull();
  expect(likes).toBeNull();
});
