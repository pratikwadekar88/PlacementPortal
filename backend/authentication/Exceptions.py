class InvalidRequest(Exception):
    """Exception raised for Invalid Request.
    """
    def __init__(self, message="Invalid Request"):
        super().__init__(self.message)