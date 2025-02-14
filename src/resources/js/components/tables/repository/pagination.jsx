export function TablePagination({ pagination }) {
    return (
        <div className="flex justify-center mt-4">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            onClick={pagination.previousPage}
                        >
                            Previous
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" onClick={pagination.nextPage}>
                            Next
                        </PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

