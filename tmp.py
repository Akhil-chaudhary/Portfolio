class student():
    def __init__(self,Rno,Name,Branch):
        self.Rno=Rno
        self.Name=Name
        self.Branch=Branch
n=int(input("Enter no. of Students-"))
students= []
for i in range(n):
    input(student.Rno)
    input(student.Name)
    input(student.Branch)
    
print(students)