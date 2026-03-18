---
layout: post
title: "Make bockMeshDict easier to use"
date: 2026-03-17
---

*blockMesh* is a commonly used utility for generating meshes in *OpenFOAM*. It reads a dictionary file, *blockMeshDict*, and stores the generated mesh in the constant directory.

The *blockMeshDict* file contains several sections, including *vertices*, *edges*, *blocks*, and *boundary*. These sections rely heavily on vertex indices, which can be difficult and error-prone to track.

A solution is to define the mesh block by block, where each block consists of 8 local vertices with a consistent ordering. While this simplifies block definition, it introduces redundant vertices and results in disconnected blocks rather than a single continuous domain.

To address this issue, we introduce a global vertex list. By sorting and removing duplicate vertices, we construct a set of unique global vertices and establish a mapping between local and global indices. This mapping enables the generation of a consistent and connected *blockMeshDict*.
