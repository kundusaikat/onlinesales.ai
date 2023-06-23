import React from "react";

export const Debug = () => {
  return (
    <div>
      <p className="text-2xl text-center font-bold">Debugging</p>
      <p className="font-bold"> Task 3 Debugging</p>

      <div>
        Given below is a Bash / Python script that performs following
        computation on an integer input (n):
        <p className="pl-5">1. If n is less than 10: Calculate its Square</p>
        <p className="pl-10">a. {`Example: 4 => 16`}</p>
        <p className="pl-5">
          2. If n is between 10 and 20: Calculate the factorial of (n-10)
        </p>
        <p className="pl-10">a. {`Example: 15 => 120`}</p>
        <p className="pl-5">
          3. If n is greater than 20: Calculate the sum of all integers between
          1 and (n-20)
        </p>
        <p className="pl-10">a. {`Example: 25 => 15`}</p>
        <p>
          The task is to identify the bugs in the script, fix them and share the
          new script. Only one of the two scripts required Bash or Python. Hint:
          You can correct the script by only changing less than 5 characters.
        </p>
      </div>

      <p className="font-bold">Given:</p>
      <p>Script (Bash)</p>
      <pre className="overflow-auto bg-gray-800 text-gray-100 p-2 rounded-lg border-4 border-double border-white border-opacity-25 mt-1 text-xs md:text-base">
        {`#!/bin/bash
N=$1
if [ $N -lt 10 ]
then
    OUT=$((N*N))
elif [ $N -lt 20 ]
then
    OUT=1
    LIM=$((N - 10))
    for (( i=1; i<$LIM; i++ ))
    do
        OUT=$((OUT * i))
    done
else
    LIM=$((N - 20))
    OUT=$((LIM * LIM))
    OUT=$((OUT - LIM))
    OUT=$((OUT / 2))
    fi
    echo $OUT`}
      </pre>

      <p>Script (Python)</p>
      <pre className="overflow-auto bg-gray-800 text-gray-100 p-2 rounded-lg border-4 border-double border-white border-opacity-25 mt-1 text-xs md:text-base">
        {`def compute(n):
    if n < 10:
        out = n ** 2
    elif n < 20:
        out = 1
        for i in range(1, n - 10):
            out *= i
    else:
        lim = n - 20
        out = lim * lim
        out = out - lim
        out = out / 2
    print(out)

n = int(input("Enter an integer: "))
compute(n)`}
      </pre>

      <p>Solution for Script(Python):</p>

      <pre className="overflow-auto bg-gray-800 text-gray-100 p-2 rounded-lg border-4 border-double border-white border-opacity-25 mt-1 text-xs md:text-base">
        {`def compute(n):
    if n < 10:
        out = n ** 2
    elif n < 20:
        out = 1
        for i in range(1, n - 9):
            out *= i
    else:
        lim = n - 19
        out = lim * lim
        out = out - lim
        out = out // 2
    print(out)

n = int(input("Enter an integer: "))
compute(n)
        `}
      </pre>

      <div className="bg-red-200 text-black p-2 rounded-lg border-4 border-double border-red-800 mt-5 border-opacity-25 text-sm md:text-base">
        <p className="font-bold">Explanation</p>
        <p className="py-2">
          1. In the second condition I have changed the for loop range{" "}
          <span className="font-bold">(n-10)</span> to
          <span className="font-bold"> (n-9)</span>. The reason for this change
          is to match the desired behavior of calculating the factorial of
          (n-10). Since the loop index starts from 1, it should iterate (n-10)
          times to calculate the factorial correctly.
        </p>
        <p className="py-2">
          2. In the third condition I have changed the{" "}
          <span className="font-bold"> lim = n - 20 </span> to{" "}
          <span className="font-bold"> lim = n - 19</span>. The reason for this
          change is to calculate the sum of all integers between 1 and (n-20).
          By setting lim as (n-19), we ensure that the sum includes (n-20) in
          the range.
        </p>
        <p className="py-2">
          3. In the third condition I have also changed{" "}
          <span className="font-bold"> out = out / 2</span> to{" "}
          <span className="font-bold"> out = out // 2</span>. The reason for
          this change is to perform integer division instead of floating-point
          division.
        </p>
      </div>
    </div>
  );
};
