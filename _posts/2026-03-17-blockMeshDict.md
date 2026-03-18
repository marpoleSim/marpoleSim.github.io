---
layout: post
title: "Make bockMeshDict Writing Easier (1)"
date: 2026-03-17
---

*blockMesh* is a commonly used utility for generating meshes in *OpenFOAM*. It reads a dictionary file, *blockMeshDict*, and stores the generated mesh in the directory *constant*.

The *blockMeshDict* file contains several sections, including *vertices*, *edges*, *blocks*, and *boundary*. These sections rely heavily on vertex indices, which can be difficult and error-prone to track.

A solution is to define the edges, blocks, and boundary block by block, where each block consists of 8 local vertices with a consistent ordering. While this simplifies dictionary definition, it introduces redundant vertices and results in disconnected blocks rather than a single continuous domain.

To address this issue, we introduce a global vertex list. By sorting and removing duplicated vertices, we construct a set of unique global vertices and establish a mapping between local and global vertex indices. This mapping enables the generation of a consistent and connected *blockMeshDict*.
